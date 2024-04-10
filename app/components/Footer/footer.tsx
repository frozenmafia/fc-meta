import { Box, Container, CssBaseline, Link, Stack, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://forge-code.com/">
        https://forge-code.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function StickyFooter() {
  const linkedInLink = "https://www.linkedin.com/in/shivankanchal/";
  const email = "shivaja295@gmail.com";
  const githubLink = "https://github.com/frozenmafia";
  const youtubeLink = "https://www.youtube.com/channel/UCGH_eH-Nxn3OLlDMqx4hF7Q";

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        {/* ... (main content) ... */}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          // bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
           <Container maxWidth="sm">
          <Stack spacing={2}>

            <Stack direction="row" spacing={1}>
              <Link color="inherit" href={linkedInLink}>
                LinkedIn
              </Link>
              <Link color="inherit" href={`mailto:${email}`}>
                Email
              </Link>
              <Link color="inherit" href={githubLink}>
                GitHub
              </Link>
              <Link color="inherit" href={youtubeLink}>
                YouTube
              </Link>
            </Stack>
            <Copyright />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default StickyFooter;
