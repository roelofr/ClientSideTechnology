# Security app

Shows login with three roles:

1) Administrator: `admin@example.com` and `admin-password01`
1) Moderator: `moderator@example.com` and `moderator-password01`
1) User: `user@example.com` and `user-password01`

These users are not created when running in production.

## Runnng on Windows

This application is developed, tested and deployed on Linux machines. Therefore, there
is by default no `localdb` config available, and Docker is used instead.

If you're on windows and want to use localdb, add this to `ConnectionStrings` in `appsettings.Development.json`:

```
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=aspnet-app-8471F9F8-377F-446A-8DAF-72A80253BF9F;Trusted_Connection=True;MultipleActiveResultSets=true"
```
