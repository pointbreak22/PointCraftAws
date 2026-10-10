using System.Xml.Linq;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

// sitemap.xml built from the CMS, so a service or case study the admin adds shows up in it
// right away. Crawlers fetch it at /sitemap.xml, which the client's Express server
// (src/server.ts) proxies here. Every page exists in two locales (Russian at the root, English
// under /en) and each <url> lists both as xhtml:link alternates so search engines pair them up.
[Route("api/seo")]
[ApiController]
[AllowAnonymous]
public class SeoController(
    IConfiguration configuration,
    IContentRepository<SiteService> services,
    IContentRepository<SiteCaseStudy> caseStudies)
    : ControllerBase
{
    private static readonly XNamespace Sitemap = "http://www.sitemaps.org/schemas/sitemap/0.9";
    private static readonly XNamespace Xhtml = "http://www.w3.org/1999/xhtml";

    [HttpGet("sitemap.xml")]
    public async Task<IActionResult> GetSitemap(CancellationToken cancellationToken)
    {
        var baseUrl = (configuration["Site:BaseUrl"] ?? "https://pointcraft.duckdns.org").TrimEnd('/');

        var paths = new List<(string Path, string Priority)> { ("/", "1.0") };
        paths.AddRange((await services.GetAllAsync(cancellationToken))
            .Where(x => x.Slug.Length > 0)
            .Select(x => ($"/services/{x.Slug}", "0.8")));
        paths.AddRange((await caseStudies.GetAllAsync(cancellationToken))
            .Where(x => x.Slug.Length > 0)
            .Select(x => ($"/projects/{x.Slug}", "0.7")));

        var urlset = new XElement(Sitemap + "urlset",
            new XAttribute(XNamespace.Xmlns + "xhtml", Xhtml),
            paths.SelectMany(page => new[] { "ru", "en" }.Select(locale => new XElement(Sitemap + "url",
                new XElement(Sitemap + "loc", baseUrl + Localize(page.Path, locale)),
                new XElement(Sitemap + "changefreq", "weekly"),
                new XElement(Sitemap + "priority", page.Priority),
                Alternate("ru", baseUrl + Localize(page.Path, "ru")),
                Alternate("en", baseUrl + Localize(page.Path, "en")),
                Alternate("x-default", baseUrl + Localize(page.Path, "ru"))))));

        return Content("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + urlset, "application/xml; charset=utf-8");
    }

    private static string Localize(string path, string locale) =>
        locale == "en" ? (path == "/" ? "/en" : "/en" + path) : path;

    private static XElement Alternate(string hreflang, string href) =>
        new(Xhtml + "link", new XAttribute("rel", "alternate"), new XAttribute("hreflang", hreflang), new XAttribute("href", href));
}
