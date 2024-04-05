import { Container, Box, Typography, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import { Metadata } from "next";

const placeholderImage = "/images/cat1.png";

export const metadata: Metadata = {
  title: 'About',
}

const About = () => {
  const linkedInLink = "https://www.linkedin.com/in/shivankanchal/";
  const email = "shivaja295@gmail.com";
  const githubLink = "https://github.com/frozenmafia";
  const youtubeLink = "https://www.youtube.com/channel/UCGH_eH-Nxn3OLlDMqx4hF7Q";

  return (
    // <Container sx={{ minHeight: '100vh' }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        gap={4}
        p={4}
      >
        <Box
          maxWidth={{ xs: "100%", md: "400px" }}
          order={{ xs: 2, md: 1 }}
          mb={{ xs: 4, md: 0 }}
        >
          <Image src={placeholderImage} alt="Sample" width={414} height={496} />
        </Box>
        <Box order={{ xs: 1, md: 2 }} textAlign={{ xs: "center", md: "left" }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Hello, I&apos;m Shivank Anchal
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            I am a seasoned Software Engineer with a passion for creating forward-thinking solutions.
            My expertise lies in crafting innovative and efficient applications with a focus on providing an exceptional user experience.
            I have a strong foundation in Data Structures and Algorithms, enabling me to solve problems with precision.
            Committed to continuous learning, I stay updated on the latest tech trends to deliver cutting-edge solutions.
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} justifyContent="center">
            <Button
              href={linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<LinkedInIcon />}
              sx={{ backgroundColor: "#0077B5", color: "#FFFFFF" }}
            >
              Connect on LinkedIn
            </Button>
            <Button
              href={`mailto:${email}`}
              variant="contained"
              startIcon={<EmailIcon />}
              sx={{ backgroundColor: "#D14836", color: "#FFFFFF" }}
            >
              Email me
            </Button>
            <Button
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{ backgroundColor: "#000000", color: "#FFFFFF" }}
            >
              Follow me on GitHub!
            </Button>
            <Button
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<YouTubeIcon />}
              sx={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
            >
              Subscribe on YouTube
            </Button>
          </Box>
        </Box>
      </Box>
    // </Container>
  );
};

export default About;
