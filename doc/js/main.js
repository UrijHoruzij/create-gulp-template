document.addEventListener('DOMContentLoaded', function () {
	var flag = false;
	var hamburger = document.querySelector('.sidebar__hamburger');
	var navigation = document.querySelector('.sidebar__navigation');
	hamburger.addEventListener('click', function () {
		if (flag) {
			hamburger.classList.remove('sidebar__hamburger--activ');
			navigation.classList.remove('sidebar__navigation--activ');
		} else {
			hamburger.classList.add('sidebar__hamburger--activ');
			navigation.classList.add('sidebar__navigation--activ');
		}
		flag = !flag;
	});
});
