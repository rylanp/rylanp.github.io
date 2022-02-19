# rylanp.github.io

This is a fun website I've made to share my ideas and gain some web development experience.

<------- Github Pages Tutorial ------->
1. Under settings/pages you need to add your domain name, the entry is "custom domain name" (Ex: rylanpaul.com)
2. The CNAME document is very important. It must contain your domain name. Ex: rylanpaul.com
3. The main HTML file must be titled index.html
4. I used Google Domains for my domain so this pertains to Google Domains, idk about other services. (As of 1/16/22)
      A. go to the DNS settings page
      B. click manage custom records
      C. Add a type A with the host name as your domain name (rylanpaul.com)
      D. TTL is the time it takes to publish something on your website, I have mine as 100, works fine
      E. Under Data add 4 rows with each one having the following numbers (185.199.108.153)(185.199.109.153)(185.199.110.153)(185.199.111.153)
            I think these link the domain to Github, idk how it works, but it works (;
      F. Add a second record of type CNAME
      G. under host name I have www
      H. TTL again is 100
      I. Then under data I have my github repository name, which for mine is (rylanp.github.io)
5. This is why your repository must be named as follows: username.github.io
            After you create the repository, the top file name part should read, "username/username.github.io,"
            Mine reads "rylanp/rylanp.github.io"
6. Lastly, back in github double checkyou have your CNAME file, index.html, then make sure the repository is public.

IMPORTANT: Because the repository is public, anyone can access these files, so do not put anything sensitive on here.


Hopefully this was a massive help, if you have questions, comments, concerns, improvements, or suggestions, please feel free to write a comment.
<------- End Github Pages Tutorial ------->

I'm not really too sure what to put it the readme, so——yeah. Cool.

Enjoy!
