using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrisonSystemManagement.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Infiermeria",
                columns: table => new
                {
                    InfiermeriaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SektoriID = table.Column<int>(type: "int", nullable: false),
                    Kapaciteti = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infiermeria", x => x.InfiermeriaID);
                });

            migrationBuilder.CreateTable(
                name: "Sektori",
                columns: table => new
                {
                    SektoriID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriSektorit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sektori", x => x.SektoriID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Infiermeria");

            migrationBuilder.DropTable(
                name: "Sektori");
        }
    }
}
