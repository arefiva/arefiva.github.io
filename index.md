---
layout: default
title: Home
---
<div class="home-hero">
  <h1>Welcome to <span class="accent">arefiva</span></h1>
  <p>Exploring how to build software systems where AI agents reason about problems, take action, and operate with meaningful autonomy. This is where I share what I am learning about agentic development, the patterns that work, and the disciplines required to build these systems well.</p>
</div>

<h2>Latest from Agentic Development</h2>

{% assign agentic_posts = site.posts | where_exp: "post", "post.categories contains 'agentic-development'" | limit: 5 %}
{% if agentic_posts.size > 0 %}
<ul class="post-list">
  {% for post in agentic_posts %}
  <li class="post-item">
    <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
    {% if post.excerpt %}
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
<p><a href="{{ '/agentic-development/' | relative_url }}">All posts &rarr;</a></p>
{% else %}
<p><em>No posts yet — <a href="{{ '/agentic-development/' | relative_url }}">check back soon</a>.</em></p>
{% endif %}

<div class="home-sections">
  <a class="home-section-card" href="{{ '/agentic-development/' | relative_url }}">
    <h3>Agentic Development</h3>
    <p>Articles on building with AI agents, automation, and the future of software development.</p>
  </a>
  <a class="home-section-card" href="{{ '/projects/' | relative_url }}">
    <h3>Projects</h3>
    <p>Things I've built — experiments, tools, and open source work.</p>
  </a>
  <a class="home-section-card" href="{{ '/about/' | relative_url }}">
    <h3>About Me</h3>
    <p>Who I am, what I do, and how to get in touch.</p>
  </a>
</div>
