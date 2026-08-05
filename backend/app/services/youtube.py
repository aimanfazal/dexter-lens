"""Everything related to turning a YouTube URL into a transcript string.

This module intentionally does ONE thing: given a URL, return the transcript
text (or raise a clear, specific exception explaining what went wrong).

Transcript retrieval is delegated to Supadata (https://supadata.ai) rather
than scraping YouTube directly. YouTube blocks most cloud-provider IPs from
the endpoints youtube-transcript-api relies on, which breaks retrieval as
soon as this service runs somewhere other than a residential connection.
Supadata handles that on their end, so this module only has to make a
regular API call.
"""

import os
import re

from supadata import Supadata, SupadataError

# Matches the video ID out of the common YouTube URL shapes:
#   https://www.youtube.com/watch?v=VIDEOID
#   https://youtu.be/VIDEOID
#   https://www.youtube.com/embed/VIDEOID
# A video ID is always exactly 11 characters of [A-Za-z0-9_-].
_YOUTUBE_ID_PATTERN = re.compile(
    r"(?:youtube\.com/(?:watch\?v=|embed/)|youtu\.be/)([A-Za-z0-9_-]{11})"
)


class InvalidYouTubeURLError(Exception):
    """Raised when we can't extract a video ID from the given URL."""


class TranscriptUnavailableError(Exception):
    """Raised when a video has no usable transcript/captions."""


def extract_video_id(youtube_url: str) -> str:
    """Pull the 11-character video ID out of a YouTube URL.

    Raises InvalidYouTubeURLError if the URL doesn't look like YouTube.
    """
    match = _YOUTUBE_ID_PATTERN.search(youtube_url.strip())
    if not match:
        raise InvalidYouTubeURLError(
            "That doesn't look like a valid YouTube URL. "
            "Expected something like https://www.youtube.com/watch?v=... "
            "or https://youtu.be/..."
        )
    return match.group(1)


def _get_client() -> Supadata:
    api_key = os.environ.get("SUPADATA_API_KEY")
    if not api_key:
        raise RuntimeError(
            "SUPADATA_API_KEY is not set. Add it to your environment "
            "(see .env.example)."
        )
    return Supadata(api_key=api_key)


def get_transcript(video_id: str) -> str:
    supadata = _get_client()

    try:
        result = supadata.transcript(
            url=f"https://www.youtube.com/watch?v={video_id}",
            text=True,      # return plain text instead of timestamped chunks
            mode="auto",    # fall back to AI transcription if there's no caption track
        )

    except SupadataError as exc:
        error_code = getattr(exc, "error", "") or ""

        if error_code in {"video-not-found", "video-unavailable"}:
            raise TranscriptUnavailableError(
                "That video couldn't be found. It may be private, deleted, or "
                "the URL may be incorrect."
            ) from exc

        if error_code in {"transcript-unavailable", "no-transcript"}:
            raise TranscriptUnavailableError(
                "This video doesn't have captions available, so a transcript "
                "can't be extracted. Try a different video."
            ) from exc

        raise TranscriptUnavailableError(
            f"Transcript retrieval failed: {exc.message}"
        ) from exc

    full_text = (result.content or "").strip()

    if not full_text:
        raise TranscriptUnavailableError(
            "The transcript for this video came back empty."
        )

    return full_text