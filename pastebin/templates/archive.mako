<%inherit file="base.mako"/>
<%def name="content()">
% if c.page.page_count > 1:
<ul id="abstract">
   <li><a href="/archive">${_("Most recent")}</a></li>
   % for li in range(c.page.page - 3 > 0 and c.page.page - 3 or 1, c.page.page + 3 <= c.page.last_page and c.page.page + 3 or c.page.last_page):
   <li><a href="/archive/${li}">${li}</a></li>
   % endfor
   <li><a href="/archive/${c.page.last_page}">${_("Oldest")}</a></li>
</ul>
% endif
<table id="archive">
   <thead>
      <th>Name</th>
      <th>Posted</th>
      <th>Expires</th>
      <th>Size</th>
      <th>Syntax</th>
   </thead>
   <tbody>
      % for i in c.page.items:
      <tr>
         <td><a href="/${i.id}">${i.title}</a></td>
         <td>${i.username}</td>
         <td>${i.creation != i.expiration and i.expiration or _("Never")}</td>
         <td>${"%.2f" % (len(i.code)/1024.0)}KB</td>
         <td>
            % if i.highlight != '000-GUESS':
            <a href="http://en.wikipedia.org/w/index.php?title=Special%3ASearch&search=${i.highlight}+programming+language" rel="nofollow">${i.highlight}</a>
            % else:
            ${i.highlight}
            % endif
         </td>
      </tr>
      % endfor
   </tbody>
</table>
</%def>
