"""rename seconds check constraint

Revision ID: 783214a47599
Revises: f35cabe5acd6
Create Date: 2026-09-26 19:53:01.776903

"""

from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "783214a47599"
down_revision: str | Sequence[str] | None = "f35cabe5acd6"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        "ALTER TABLE track RENAME CONSTRAINT seconds_positivos TO seconds_positive"
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(
        "ALTER TABLE track RENAME CONSTRAINT seconds_positive TO seconds_positivos"
    )
