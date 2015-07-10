Meteor.methods(
{
  'listEnvironments': function ()
  {
    return HTTP.call('GET', 'http://localhost:8080/api/vms')
  },
  'deleteVM': function (vm)
  {
    return HTTP.call('DELETE', 'http://localhost:8080/api/vms/' + vm)
  },
  'addVM': function (id, name, tag)
  {
    console.dir('adding');

    return HTTP.call('POST', 'http://localhost:8080/api/vms',
    {
      data:
      {
        id: id,
        name: name,
        tag: tag
      }
    })
  },
  'powerStatus': function (vm)
  {
    return HTTP.call('GET', 'http://localhost:8080/api/vms/power/' + vm)
  },
  'powerToggle': function (vm, state)
  {
    var options = {
      headers:
      {
        'Content-Type': 'text/html'
      },
      content: state
    };

    return HTTP.call('PATCH', 'http://localhost:8080/api/vms/power/' + vm, options);
  },
  'ipaddress': function (vm)
  {
    return HTTP.call('GET', 'http://localhost:8080/api/vms/' + vm + '/ipaddress')
  }
});