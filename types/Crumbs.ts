interface Crumb {
  name: string;
  path: string;
}

export default Crumb;

export const homeCrumb = { name: 'home', path: '/' };
export const aboutCrumb = { name: 'about', path: '/about' };
export const articlesCrumb = { name: 'articles', path: '/articles' };
export const projectsCrumb = { name: 'projects', path: '/projects' };