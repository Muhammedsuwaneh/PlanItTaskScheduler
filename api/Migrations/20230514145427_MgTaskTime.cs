using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserTaskManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class MgTaskTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EndTime",
                table: "UserTasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartTime",
                table: "UserTasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "UserTasks");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "UserTasks");
        }
    }
}
