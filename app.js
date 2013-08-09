// VulNode - A Node.js application vulnerable to server-side javascript injection.
// DO NOT use this code in production environment. This is for educational purposes only.

// parameters to save a profile: ?action=save&name=nishant&json={"name":"Nishant","age":"25","gender":"Male","location":"Bangalore","interests":"Piano"}

// parameters to view a profile: ?action=view&name=nishant

// parameters to delete a profile: ?action=delete&name=nishant


// Code Execution: ?action=save&name=nishant&json='test');var sys=require('sys');var exec=require('child_process').exec;function puts(error,stdout,stderr){sys.puts(stdout)};exec("ls -lah",puts);//

var fs = require('fs');
var url = require('url');
var http = require('http');
var ip = '127.0.0.1'; // ip-address of the host
var port = 9091;      // port number to listen
profile_data = '';

//Create webpage header and footer
var header=''
var footer='</body></html>';

fs.readFile(process.cwd()+'/header.txt', function (err, data) {
  if (err) { return err; }
    header = data;
});

//Start the HTTP server and listen on a specified port
http.createServer(function (req, res) {
  var query = url.parse(decodeURIComponent(req.url), true).query;
  var json_data = query.json ? eval('('+query.json+')') : '';
  var profile = query.name ? query.name : '';

//View a profile, if exists
  if (query.action=='view' && profile!='') {
    readPath = process.cwd() + '/db/' + profile + '.txt';
    fs.readFile(readPath, function (err, data) {
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log(err);
        res.end('Something went wrong!');
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log('Served new profile: '+profile);
        res.end(header+data+footer);
      }
    });
  }
//Save a profile as text file
  else if (query.action=='save' && profile!='' && json_data!='') {
    writePath = process.cwd() + '/db/' + profile + '.txt';
    profile_data = '<b>Name:</b> ' + json_data.name + '</br><b>Age:</b> ' + json_data.age + '</br><b>Gender:</b> ' + json_data.gender + '</br><b>Location:</b> ' + json_data.location + '</br><b>Interests:</b> ' + json_data.interests;
    fs.writeFile(writePath,profile_data);
    readPath = writePath;
    fs.readFile(readPath, function (err, data) {
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log(err);
        res.end(header+'Something went wrong!'+footer);
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log('Saved new profile:'+profile);
        res.write('Saved new profile: <b>'+profile+'</b>');
        res.end(header+data+footer);
      }
    });
    profile_data = "";
  }
//Delete a profile
  else if (query.action=='delete' && profile!='') {
    deletePath = process.cwd() + '/db/' + profile + '.txt';
    fs.unlink(deletePath, function (err) {
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log(err);
        res.end(header+'Something went wrong!'+footer);
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log('Removed a profile:'+profile);
        res.end(header+'Removed a profile: <b>'+profile+'</b>'+footer);
      }
    });
  }
//Print the welcome message, if no parameters are passed to the application
  else {
    save_profile = 'http://'+req.headers.host+'/?action='+encodeURIComponent('save&name=nishant&json={"name":"Nishant","age":"25","gender":"Male","location":"Bangalore","interests":"Piano"}');
    view_profile = 'http://'+req.headers.host+'/?action=view&name=nishant';
    delete_profile = 'http://'+req.headers.host+'/?action=delete&name=nishant';
    welcome_content = '<b>Save a profile</b>: <a href=\"'+save_profile+'\">'+decodeURIComponent(save_profile)+'</a></br><b>View a profile</b>: <a href=\"'+view_profile+'\">'+view_profile+'</a></br><b>Delete a profile</b>: <a href=\"'+delete_profile+'\">'+delete_profile+'</a><span><p>by <a href=\"mailto:nishant.dp@gmail.com\">nishant.dp@gmail.com</a></p></span>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log('Served welcome page');
    res.end(header+welcome_content+footer);    
  }
}).listen(port,ip);
console.log('Server running at http://'+ip+':'+port);
