import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SideBar from "@/components/UI/Navigation";
import MobileNavigation from "@/components/UI/MobileNavigation";

const LayoutTheme = styled(Grid)(({ theme }) => ({
    background: "#CFD8DC",
    minHeight: "100vh",
    display: "flex",
}));

const PagesLayoutTheme = styled(Grid)(({ theme}) => ({
    background: "#EDEFF1", 
    margin: "0", 
    width: "100%",
    minHeight: "100vh",
}));

export default function DashboardLayout({ children }) {
   return (
      <LayoutTheme sx={{ flexDirection: { xs: "none", sm: "row"} }}>
        <Grid item xs={1} sx={{ position: "relative", height: "100vh"}}>
            <SideBar />
        </Grid>
        <PagesLayoutTheme item xs={10} sx={{ padding: { sm: "1rem 1rem 0 310px", xs: "0"}}}>
            <MobileNavigation />
            {children}
        </PagesLayoutTheme>
      </LayoutTheme>
   );
};