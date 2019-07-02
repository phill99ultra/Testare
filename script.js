const list = [
  {
    FirstName: 'Brisa',
    SecondName: 'Mckay',
    DateBirth: '01.01.1980'
  },
  {
    FirstName: 'Rylee',
    SecondName: 'Smith',
    DateBirth: '01.02.1981'
  },
  {
    FirstName: 'Zara',
    SecondName: 'Bird',
    DateBirth: '01.05.1982'
  },
  {
    FirstName: 'Molly',
    SecondName: 'Bond',
    DateBirth: '01.05.1988'
  },
  {
    FirstName: 'Anya',
    SecondName: 'Koch',
    DateBirth: '05.08.1990'
  },
  {
    FirstName: 'Ali',
    SecondName: 'Boone',
    DateBirth: '06.09.1991'
  },
  {
    FirstName: 'Sofia',
    SecondName: 'Bean',
    DateBirth: '08.10.1972'
  },
  {
    FirstName: 'Shamar',
    SecondName: 'Reyes',
    DateBirth: '20.05.1999'
  },
  {
    FirstName: 'Virginia',
    SecondName: 'Rosales',
    DateBirth: '09.11.1998'
  },
  {
    FirstName: 'Desmond',
    SecondName: 'Benjamin',
    DateBirth: '1995-12-31'
  }
];

let searchFamily = document.querySelector('.input__family');
let suggested = document.querySelector('.match__list');
let name = document.querySelector('.input__name');
let date = document.querySelector('input__date');
searchFamily.addEventListener('input', () => {
  let input = searchFamily.value;
  suggested.innerHTML = '';
  let suggestions = list.filter(family => {
    return family.FirstName.toLowerCase().startsWith(input);
  });
  suggestions.forEach(family => {
    let li = document.createElement('li');
    li.innerHTML = family.FirstName;
    li.setAttribute('data-family', family.FirstName);
    li.classList.add('family-item');
    suggested.appendChild(li);
  });
  const families = document.querySelectorAll('ul > .family-item');
  families.forEach(item => {
    item.addEventListener('click', e => {
      newFamily = e.target.textContent;
      searchFamily.value = newFamily;
      let index = list.findIndex(item =>
        item.FirstName.toLowerCase().startsWith(input)
      );
      console.log(list[index].DateBirth);
      name.value = list[index].SecondName;
      $('.input__date').val(list[index].DateBirth);
      suggested.innerHTML = '';
    });
  });

  if (input == '') {
    suggested.innerHTML = '';
  }
});
