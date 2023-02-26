import { Box, Container, Grid, Link, Typography } from "@mui/material"
import React, { FC } from "react"

const NavItem = [
  {
    title: "About us",
    items: [
      {
        title: "Who are we ?",
        url: "#",
      },
      {
        title: "How it works?",
        url: "#",
      },
      {
        title: "Partner ?",
        url: "#",
      },
      {
        title: "FAQ ?",
        url: "#",
      },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        title: "info@izycoins.com",
        url: "mailto:info@izycoins.com",
      },
      {
        title: "WhatsApp: +62 859 6592 4380",
        url: "https://wa.me/006285965924380",
      },
    ],
  },
]

const LandingPageFooter: FC = () => {
  return (
    <Box
      sx={{
        background: "#c1c1c1af",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {NavItem.map((item, index) => (
            <Grid
              xs={12}
              md={12 / NavItem.length++}
              item
              key={`item-${index++}`}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontWeight: "medium",
                  color: "#4f4f4f",
                }}
              >
                {item.title}
              </Typography>
              <Box flexDirection="column">
                {item.items.map((link, index) => (
                  <Box mt={1} mb={1} key={`${link.title}-${index++}`}>
                    <Link
                      underline="hover"
                      href={link.url}
                      sx={{
                        fontWeight: "regular",
                        color: "#4f4f4f",
                      }}
                    >
                      {link.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          background: "#979797ae",
        }}
      >
        <Typography
          variant="subtitle2"
          textAlign="center"
          pt={2}
          pb={2}
          sx={{
            fontWeight: "medium",
            color: "#4f4f4f",
          }}
        >
          Copyright © {new Date().getFullYear()} by{" "}
          <Link
            href="https://github.com/Nanfack-Takoutsi-Yvan"
            target="_blank"
            underline="hover"
          >
            Yvan Nanfack
          </Link>{" "}
          All rights reserved
        </Typography>
      </Box>
    </Box>
  )
}

export default LandingPageFooter
