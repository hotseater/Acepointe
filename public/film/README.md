# Sales films

Served straight from here, so each film has a stable URL that can be sent on its
own — attached to an email, dropped in a deck, forwarded by a prospect to whoever
actually signs.

| file | page | film |
|---|---|---|
| `acepointe-forward-deployed.mp4` | `/forward-deployed` | Film B — "We embed, and we build" |
| `acepointe-the-system.mp4` | `/brightcover` | Film A — "The system that runs your marketing" |

**These files are public.** A static file on Vercel cannot sit behind the page's
cookie without routing it through a function, and it does not need to: the films
contain nothing that is not already published on this site. The pages are private
so a prospect receives one as something addressed to them; the files are unlisted
rather than secret.

`robots.txt` disallows `/film/`, and `astro.config.mjs` keeps the path out of the
sitemap. Both matter — Google indexes mp4s and will happily return one as a video
result.

Rendered from `AcePointe/Marketing/sales-video/`. See `PRODUCTION.md` there.
