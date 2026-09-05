using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSiteContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SiteCaseStudies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TitleEn = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    TitleRu = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    TaskEn = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    TaskRu = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SolutionEn = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SolutionRu = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    Results = table.Column<string>(type: "TEXT", nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteCaseStudies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteProcessSteps",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TitleEn = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    TitleRu = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    DescriptionEn = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    DescriptionRu = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteProcessSteps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteServices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Icon = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    TitleEn = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    TitleRu = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    DescriptionEn = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    DescriptionRu = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    FeaturesEn = table.Column<string>(type: "TEXT", nullable: false),
                    FeaturesRu = table.Column<string>(type: "TEXT", nullable: false),
                    AudienceEn = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    AudienceRu = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteServices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteTechStackAreas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Icon = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    AreaEn = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    AreaRu = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Technologies = table.Column<string>(type: "TEXT", nullable: false),
                    BenefitEn = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    BenefitRu = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteTechStackAreas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteTrustPoints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Icon = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    LabelEn = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    LabelRu = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteTrustPoints", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteCaseStudies");

            migrationBuilder.DropTable(
                name: "SiteProcessSteps");

            migrationBuilder.DropTable(
                name: "SiteServices");

            migrationBuilder.DropTable(
                name: "SiteTechStackAreas");

            migrationBuilder.DropTable(
                name: "SiteTrustPoints");
        }
    }
}
