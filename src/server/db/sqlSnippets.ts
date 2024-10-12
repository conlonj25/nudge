// SELECT nudge_habit.name, nudge_log.value_boolean
// FROM nudge_log
// LEFT JOIN nudge_habit
// ON nudge_log.habit_id = nudge_habit.id
// WHERE nudge_log.date = '2024-10-12'

// db.select({
//   name: nudgeHabit.name,
//   value: nudgeLog.valueBoolean
// })
//   .from(nudgeLog)
//   .where(eq(nudgeLog.date, '2024-10-12'))
//   .leftJoin(nudgeHabit, eq(nudgeLog.habitId, nudgeHabit.id));
