using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserTaskManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class MgUpdateUserTaskModelAddStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Priority",
                table: "UserTasks",
                newName: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "UserTasks",
                newName: "Priority");
        }
    }
}
