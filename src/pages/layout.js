import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SideBar from "@/components/UI/Navigation/Navigation";
import MobileNavigation from "@/components/UI/Navigation/MobileNavigation";

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
      <LayoutTheme sx={{ flexDirection: { lg: "row", xs: "none", sm: "none", md: "none"} }}>
        <Grid item xs={1} sx={{ position: "relative", height: "100vh"}}>
            <SideBar />
        </Grid>
        <PagesLayoutTheme item xs={10} sx={{ padding: { lg: "1rem 1rem 0 310px", xs: "0", sm: "0", md: "0"}, 
        margin: { lg: "0", sm: "5rem 0 0 0", md: "5rem 0 0 0", xs: "5rem 0 0 0"}}}>
            {children}
        </PagesLayoutTheme>
      </LayoutTheme>
   );
};