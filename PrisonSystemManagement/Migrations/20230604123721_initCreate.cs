using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrisonSystemManagement.Migrations
{
    public partial class initCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Drejtori",
                columns: table => new
                {
                    DrejtoriID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SektoriID = table.Column<int>(type: "int", nullable: false),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rruga = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zipkodi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gjinia = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drejtori", x => x.DrejtoriID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drejtori");
        }
    }
}
