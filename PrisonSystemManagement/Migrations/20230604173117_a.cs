using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrisonSystemManagement.Migrations
{
    public partial class a : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Infiermeria",
                newName: "Updated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Infiermeria",
                newName: "Created_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Drejtori",
                newName: "Updated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Drejtori",
                newName: "DateLindja");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created_at",
                table: "Drejtori",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created_at",
                table: "Drejtori");

            migrationBuilder.RenameColumn(
                name: "Updated_at",
                table: "Infiermeria",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "Created_at",
                table: "Infiermeria",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Updated_at",
                table: "Drejtori",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "DateLindja",
                table: "Drejtori",
                newName: "CreatedAt");
        }
    }
}
