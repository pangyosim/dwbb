// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import axios from "axios";

function BuiltByDevelopers() {
  const [noticeData, setNoticeData] = useState([]);

  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg";
    useEffect(()=>{
      axios.post('https://129.213.127.53:8080/notice-all')
      .then((res)=>{
        const arr = res.data;
        arr.sort(function compare (a,b){
          if( a.noticecreateday > b.noticecreateday ) return -1;
          if( a.noticecreateday < b.noticecreateday ) return 1;
          return 0;
        });
        setNoticeData(arr.slice(0,5));
      })
      .catch((error)=>{
        alert('Inform Error : ' + error);
      })
    },[])
  return (
    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      width="100%"
      py={5}
      mt={0}
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8)
          )}, url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <MKTypography variant="h1" color="white" mb={3.5} px={3.5}>
          공지사항
        </MKTypography>
        {noticeData.map((v,i)=>{
          let mb_val = 0;
          if( i === noticeData.length-1 ) {
            mb_val = 3;
          } else {
            mb_val = 0;
          }
          return(
            <Grid container sx={{ ml: { xs: 1, lg: 4 } }} key={i} spacing={0} pl={0} mb={mb_val} flexDirection="row">
                <Grid item md={10} xs={12} py={0} style={{color: "white"}}>
                  <span style={{color:"red"}}>[공지]</span> {v.noticetitle}
                </Grid>
                <Grid  item md={1.5} xs={12} py={0} style={{color: "white"}}>
                  {v.noticecreateday.substring(0,v.noticecreateday.indexOf('T'))}
                </Grid>
            </Grid>
          );
        })}
          <MKTypography
            component="a"
            href="/pages/landing-pages/notice"
            variant="body1"
            color="white"
            fontWeight="bold"
            sx={{
              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translateX(3px)`,
                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
              },
              "&:hover .material-icons-round, &:focus .material-icons-round": {
                transform: `translateX(6px)`,
              },
            }}
            mx={4}
          >
            더보기<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
      </Container>
    </MKBox>
  );
}

export default BuiltByDevelopers;
