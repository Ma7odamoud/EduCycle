import { Component } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";

/**
 * ErrorBoundary — catches any unhandled React render errors so the
 * whole app doesn't go blank. Shows a friendly recovery UI instead.
 *
 * Handles the common "removeChild" crash caused by browser auto-translate
 * modifying the DOM (Chrome Translate, Samsung Browser, etc.).
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isTranslateError: false };
  }

  static getDerivedStateFromError(error) {
    // Detect the browser-translate DOM crash
    const isTranslateError =
      error?.message?.includes("removeChild") ||
      error?.message?.includes("NotFoundError") ||
      error?.message?.includes("is not a child");

    return { hasError: true, error, isTranslateError };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, isTranslateError: false });
    window.location.reload();
  };

  handleHome = () => {
    this.setState({ hasError: false, error: null, isTranslateError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const { isTranslateError } = this.state;

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 4,
            textAlign: "center",
            bgcolor: "background.default",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 72, color: "error.main", mb: 2 }} />

          <Typography variant="h5" fontWeight={700} gutterBottom>
            {isTranslateError ? "Browser Translation Issue" : "Something went wrong"}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 1, maxWidth: 380 }}
          >
            {isTranslateError
              ? "Your browser's auto-translate feature is interfering with the app. Please disable translation for this page and reload."
              : "An unexpected error occurred. Please reload the page."}
          </Typography>

          {isTranslateError && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 380, fontStyle: "italic" }}
            >
              Tip: In Chrome, tap the translate icon in the address bar and
              choose &quot;Never translate this page&quot;.
            </Typography>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={this.handleReload}
            >
              Reload Page
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={this.handleHome}
            >
              Go Home
            </Button>
          </Stack>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
