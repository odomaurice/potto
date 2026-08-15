export function getDashboardRoute(user: {
  role: string;
  schoolId?: string | null;
}) {
  switch (user.role) {
    case "PLATFORM_ADMIN":
      return `/platform-admin`;

    case "SCHOOL_ADMIN":
      return `/admin`;

    case "TEACHER":
      return `/school/${user.schoolId}/teacher`;

    case "STUDENT":
      return `/school/${user.schoolId}/student`;

    case "PARENT":
      return `/school/${user.schoolId}/parent`;

    default:
      return "/";
  }
}