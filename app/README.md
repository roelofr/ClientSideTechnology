# Security app

Shows login with three roles:

1) Administrator: `admin@example.com` and `admin-password01`
1) Moderator: `moderator@example.com` and `moderator-password01`
1) User: `user@example.com` and `user-password01`

These users are not created when running in production.

## Runnng on Windows

This application is developed, tested and deployed on Linux machines. Therefore, there
is by default no `localdb` config available, and Docker is used instead.

If you're on windows, add this to `appsettings.Development.json` to enable the localdb:

```
   "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\LoginContext;Database=LoginContext;User ID=sa;Password=Docker2020;MultipleActiveResultSets=true"
   },
```
