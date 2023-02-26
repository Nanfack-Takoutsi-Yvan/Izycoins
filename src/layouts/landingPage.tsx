import * as React from "react"
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material"
import ResponsiveAppBar from "@components/Bars/landingPageAppBar"
import LandingPageFooter from "@components/Bars/landingPageFooter"
import image from "@images/index"
import LoginDialog from "@components/Modal/loginDialog"

type props = {
  path: string
}

const LandingPage: React.FC<props> = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const handleModal = () => {
    setIsModalOpen((value) => !value)
  }

  return (
    <Box>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "-1",
          background:
            "radial-gradient(circle at 85% 33%,rgba(0,255,235,.085),hsla(0,0%,100%,0) 25%),radial-gradient(circle at 12% 55%,rgba(108,99,255,.1),hsla(0,0%,100%,0) 25%)",
        }}
      />
      <ResponsiveAppBar onLoginButtonPressed={handleModal} />
      <Box
        height="90vh"
        mb={5}
        sx={{
          backgroundImage: { xs: "", sm: `url(${image.designBackground})` },
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
          backgroundSize: "80px",
          backgroundPositionX: "left",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} alignItems="center">
              <Box>
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    fontWeight: "medium",
                    color: "#38405a",
                  }}
                >
                  Binance Triangular Arbitrage In Real Time
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontWeight: "medium",
                    color: "#38405a",
                  }}
                >
                  Find market imperfections easily!
                </Typography>
                <Typography
                  variant="body1"
                  component="h4"
                  mt={6}
                  sx={{
                    fontWeight: "medium",
                    color: "#38405a",
                  }}
                >
                  IzyCoins Capital is a cryptocurrency broker, engaged in the
                  business of providing various type of trading Arbitrages
                  strategies. Our aim is to vulgarise Arbitrage towards mass
                  market and secure better returns regardless of global
                  financial markets conditions. contact us :{" "}
                  <Link href="mailto:info@izycoins.com" underline="hover">
                    info@izycoins.com
                  </Link>
                </Typography>
                <Box mt={6}>
                  <Button
                    sx={{ borderRadius: 5, boxShadow: 6 }}
                    variant="contained"
                    onClick={handleModal}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <img
                style={{ display: "block" }}
                src={image.landingPageImage}
                alt="Illustration"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <LandingPageFooter />
      <LoginDialog isDialogOpen={isModalOpen} onCloseDialog={handleModal} />
    </Box>
  )
}

export default LandingPage
