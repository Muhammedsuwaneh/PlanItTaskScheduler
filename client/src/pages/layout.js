import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SideBar from "@/components/UI/Navigation";

const LayoutTheme = styled(Grid)(({ theme }) => ({
    background: "#CFD8DC",
    minHeight: "100vh",
    display: "flex",
}));

const PagesLayoutTheme = styled(Grid)(({ theme}) => ({
    background: "#EDEFF1", 
    paddingLeft: "310px", 
    paddingRight: "1rem",
    paddingUp: "1rem",
    margin: "0", 
    width: "100%",
    minHeight: "100vh",
}));

export default function DashboardLayout({ children }) {
   return (
      <LayoutTheme>
        <Grid item xs={1} sx={{ position: "relative", height: "100vh"}}>
            <SideBar />
        </Grid>
        <PagesLayoutTheme item xs={10}>
            {children}
        </PagesLayoutTheme>
      </LayoutTheme>
   );
};