/* @refresh reload */
import { ErrorBoundary, render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";

import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/atkinson-hyperlegible/400-italic.css";
import "@fontsource/atkinson-hyperlegible/700-italic.css";
import { lazy } from "solid-js";

const root = document.getElementById("root");

// Lazy import different views to allow code splitting
const App = lazy(() => import("./App"));
const HomeView = lazy(() => import("./views/home"));
const SettingsFacet = lazy(() => import("./views/facets/settings"));
const EditorFacet = lazy(() => import("./views/facets/editor"));
const NotificationsFacet = lazy(() => import("./views/facets/notifications"));
const AboutPillbugView = lazy(() => import("./views/aboutpillbug"));
const Feed = lazy(() => import("./views/feed"));
const UserProfile = lazy(() => import("./views/userprofile"));
const LoginView = lazy(() => import("./views/login"));
const PostPage = lazy(() => import("./views/postpage"));
const DevEditDialogPage = lazy(() => import("./views/dev/editdialogpage"));
const ErrorBox = lazy(() => import("./components/error"));
const ErrorView = lazy(() => import("./views/error"));
const AboutDetailsFacet = lazy(() => import("./views/facets/details"));

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
}

render(
    () => (
        <ErrorBoundary
            fallback={(e) => (
                <ErrorBox
                    error={e}
                    description="Failed to load page (top level catch)"
                />
            )}
        >
            <Router root={App}>
                <Route path="/" component={HomeView} />
                <Route
                    path="/feed"
                    component={() => {
                        return <Feed />;
                    }}
                />
                <Route
                    path="/notifications"
                    component={() => {
                        return <NotificationsFacet />;
                    }}
                />
                <Route
                    path="/search"
                    component={() => {
                        return <div>placeholder for search</div>;
                    }}
                />
                <Route
                    path="/profile"
                    component={() => {
                        return <div>placeholder for profile</div>;
                    }}
                />
                <Route
                    path="/editor/new"
                    component={() => {
                        return <EditorFacet />;
                    }}
                />
                <Route
                    path="/share/:shareTarget"
                    component={() => {
                        return <EditorFacet />;
                    }}
                />
                <Route
                    path="/settings"
                    component={() => {
                        return <SettingsFacet />;
                    }}
                />
                <Route path="/about" component={AboutPillbugView} />
                <Route path="/about/details" component={AboutDetailsFacet} />
                <Route path="/login" component={LoginView} />
                <Route path="/user/:username" component={UserProfile} />
                <Route path="/post/:postId" component={PostPage} />
                <Route path="*paramName" component={ErrorView} />
                <Route path="/dev/editDialog" component={DevEditDialogPage} />
            </Router>
        </ErrorBoundary>
    ),
    root!
);
