# Troubleshoot

Sometimes in MAC the ntp of docker machines are out of sync.
If so the twitter API raises `401` error with clever disguise
so that you don't understand what went wrong.

Then login to the docker machine and sync NTP.

```bash
docker-machine ssh default
sudo ntpclient -s -h pool.ntp.org
```
