<%inherit file="base.mako"/>
<%def name="content()">
   % if c.snippet.code:
      <h2>${c.snippet.title}</h2>
      <ul id="abstract">
         <li>${_("Syntax")}: ${c.snippet.highlight}</li>
         <li>${_("Author")}: ${c.snippet.username}</li>
         <li>${c.snippet.creation}</li>
         <li class="action"><a href="/${c.snippet.id}/raw">raw</a></li>
      </ul>
      % if c.snippet.codeformatted:
      ${c.snippet.codeformatted }
      % else:
      <ol id="cookedcode">
         % for i in c.snippet.code.split('\n'):
         <li>${i | h}</li>
         % endfor
      </ol>
      % endif
   % endif
   <form action="/post" method="POST" id="pasteform">
      <input type="hidden" name="form.submitted" value="1"/>
      % if c.snippet.id:
      <input type="hidden" name="id" value="${c.snippet.id}"/>
      % endif
      <label for="code">${_("Code snippet")}:</label>
      <textarea id="code" name="code">${c.snippet.code}</textarea>
      <div class="formfield">
         <label for="highlight">${_("Syntax highlight")}:</label>
         <select id="highlight" name="highlight">
         % for i in [(_("Guess"), ('000-GUESS',))] + c.highlight:
            <option value="${i[1][0]}" ${('highlight' in request.POST and request.POST['highlight'] == i[1][0] or c.snippet.highlight == i[1][0]) and 'selected' }>${i[0]}</option>
         % endfor
         </select>
      </div>
      <div class="formfield">
      <label for="expiration">${_("Post expiration")}:</label>
         <select id="expiration" name="expiration">
         % for k,v in {"Never (ARE YOU SURE?)": -1, "10 Minutes": 600, "1 Hour": 3600, "1 Day": 86400, "1 Month": 2592000}.items():
            <option value="${v}">${_(k)}</option>
         % endfor
      </select>
      </div>
      <div class="formfield">
         <label for="title">${_("Title")}:</label>
         <input type="text" id="title" name="title" value="${('title' in request.POST and request.POST['title']) or c.snippet.title}"/>
      </div>
      <div class="formfield">
         <label for="username">${_("Username")}:</label>
         <input type="text" id="username" name="username" value="${('username' in request.POST and request.POST['username']) or c.snippet.username}"/>
         <input type="submit" value="${_('Paste!')}"/>
      </div>
   </form> 
</%def>
