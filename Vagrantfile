Vagrant.configure('2') do |setup|
  setup.vm.provider "virtualbox"
  # setup box
  setup.vm.box = "ubuntu/trusty64"

  # setup network
  setup.vm.network :forwarded_port, guest: 8080, host: 8080

  # setup synced folders
  setup.vm.synced_folder ".", "/vagrant", disabled: true
  setup.vm.synced_folder ".", "/project"

  #setup shell provision
  setup.vm.provision :shell, privileged: false, path: ".env/dev/setup.sh"
  setup.vm.provision :shell, privileged: false, run: 'always', path: ".env/dev/run.sh"
end
