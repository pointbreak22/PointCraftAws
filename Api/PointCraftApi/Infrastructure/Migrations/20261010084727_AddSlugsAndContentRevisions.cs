using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSlugsAndContentRevisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BodyEn",
                table: "SiteServices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BodyRu",
                table: "SiteServices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "SiteServices",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BodyEn",
                table: "SiteCaseStudies",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BodyRu",
                table: "SiteCaseStudies",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ServiceSlugs",
                table: "SiteCaseStudies",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "SiteCaseStudies",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Stack",
                table: "SiteCaseStudies",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "SiteCaseStudies",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppliedContentRevisions",
                columns: table => new
                {
                    Revision = table.Column<int>(type: "INTEGER", nullable: false),
                    AppliedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppliedContentRevisions", x => x.Revision);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppliedContentRevisions");

            migrationBuilder.DropColumn(
                name: "BodyEn",
                table: "SiteServices");

            migrationBuilder.DropColumn(
                name: "BodyRu",
                table: "SiteServices");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "SiteServices");

            migrationBuilder.DropColumn(
                name: "BodyEn",
                table: "SiteCaseStudies");

            migrationBuilder.DropColumn(
                name: "BodyRu",
                table: "SiteCaseStudies");

            migrationBuilder.DropColumn(
                name: "ServiceSlugs",
                table: "SiteCaseStudies");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "SiteCaseStudies");

            migrationBuilder.DropColumn(
                name: "Stack",
                table: "SiteCaseStudies");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "SiteCaseStudies");
        }
    }
}
