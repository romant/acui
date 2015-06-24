var vms = [];

function reinit()
{
  vms=[];
  Meteor.call('listEnvironments', function (err, result)
  {
    if (err)
    {
      console.dir("no love from env");
      return null;
    }
    else
    {
      JSON.parse(result.content).map(function (vm)
      {
        Meteor.call("powerStatus", vm, function (err, powerState)
        {
          Meteor.call("ipaddress", vm, function (err, ipResult)
          {
            var ipAddress;

            if (ipResult)
              ipAddress = JSON.parse(ipResult.content).message
            else
              ipAddress = "unknown";

            vms.push(
            {
              name: vm,
              power: JSON.parse(powerState.content).message,
              ip: ipAddress
            });

            Session.set('vms', vms);
          });
        });
      });
    }
  })
}

Template.layout.rendered = function ()
{
  reinit();
  $(document).ready(function ()
  {
    $('.collapsible').collapsible(
    {
      accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

  });
};

Template.layout.helpers(
{
  vms: function ()
  {
    return Session.get('vms');
  }
});

Template.vm.helpers(
{
  poweredOn: function ()
  {
    return this.power === "powered on";
  }
});

Template.layout.events(
{
  'click .delete': function (e)
  {
    Meteor.call('deleteVM', this.name);
    Materialize.toast('deleting + ' + this.name, 4000);
    reinit();
  },
  'submit form': function (e)
  {
    e.preventDefault();

    var vm_name = e.target.vm_name.value;
    // var vm_id = e.target.vm_id.value;
    // var vm_tag = e.target.vm_tag.value;

    Materialize.toast('Attempting to Create => ' + vm_name, 4000);

    Meteor.call('addVM', vm_name, "photon", "photon");
    reinit();
    // Meteor.call('addVM', vm_name, vm_id, vm_tag);
    return false;
  }

});