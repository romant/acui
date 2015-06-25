Meteor.methods(
{
  'listEnvironments': function ()
  {
    return Meteor.http.call('GET', 'http://localhost:8080/api/vms')
  },
  'deleteVM': function (vm)
  {
    return Meteor.http.call('DELETE', 'http://localhost:8080/api/vms/' + vm)
  },
  'addVM': function (id, name, tag)
  {
    console.dir('adding');
    
    return Meteor.http.call('POST', 'http://localhost:8080/api/vms',
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
    return Meteor.http.call('GET', 'http://localhost:8080/api/vms/power/' + vm)
  },
  'powerToggle': function (vm, state)
  {
    return Meteor.http.call('PATCH', 'http://localhost:8080/api/vms/power/' + vm, state)
  },
  'ipaddress': function (vm)
  {
    return Meteor.http.call('GET', 'http://localhost:8080/api/vms/' + vm + '/ipaddress')
  }
});