package utility

import (
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

// this function converts a string to pgtype.time
func ParsePgTime(value string) (pgtype.Time, error) {
	if value == "" {
		return pgtype.Time{
			Valid: false,
		}, nil
	}

	t, err := time.Parse("15:04:05", value)
	if err != nil {
		return pgtype.Time{}, err
	}

	// Convert to number of microseconds since midnight
	microseconds := int64((t.Hour()*3600 + t.Minute()*60 + t.Second()) * 1_000_000)

	return pgtype.Time{
		Microseconds: microseconds,
		Valid:        true,
	}, nil
}

// this function converts  time.time to pgtype.time for database manipulation
func FromPGTime(t pgtype.Time) (time.Time, error) {
	if !t.Valid {
		return time.Time{}, fmt.Errorf("invalid pgtype.Time")
	}
	return time.Date(0, 1, 1, 0, 0, 0, int(t.Microseconds)*1000, time.UTC), nil
}

func ToPGTime(t time.Time) pgtype.Time {
	// Calculate microseconds since midnight
	midnight := time.Date(0, 1, 1, 0, 0, 0, 0, time.UTC)
	microseconds := t.Sub(midnight).Microseconds()

	return pgtype.Time{
		Microseconds: microseconds,
		Valid:        true,
	}
}
