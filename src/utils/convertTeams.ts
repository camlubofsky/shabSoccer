import { Player } from '../App';

export const convertArrayToObject = (array: Player[]) => {
  const result: any = { light: [], dark: [] };

  array.forEach((item) => {
    const { name, team } = item;

    const [firstName, lastName] = name.split(' ');
    const doubles = ['Ben', 'Dan', 'Dav'];
    let transformedName = '';
    if (doubles.includes(firstName.slice(0, 3))) {
      transformedName = `${firstName} ${lastName.charAt(0)}`;
    } else {
      transformedName = `${firstName}`;
    }

    if (team === 'light') {
      result.light.push(transformedName);
    } else if (team === 'dark') {
      result.dark.push(transformedName);
    }
  });

  return result;
};
