import demoFileUrl from './demo-file.csv?url';
export const demoFile = new File(
  [await fetch(demoFileUrl).then(res => res.text())],
  'demo-file.csv',
  {
    type: 'text/csv',
  },
);
