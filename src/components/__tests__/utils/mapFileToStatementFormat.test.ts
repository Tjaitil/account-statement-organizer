import { describe, expect, test } from 'vitest';
import { mapFromStatementFormat } from '../../../utils/mapFileToStatementFormat';
import { EntryFormat } from '../../../types/Statements';

const expectedFormatOne: EntryFormat['columns'] = [
  {
    Dato: '01.09.2024',
    Type: 'Varekjøp',
    Beskrivelse: 'Lønn AS          NO',
    Beløp: '10000',
  },
  {
    Dato: '17.09.2024',
    Type: 'Varekjøp',
    Beskrivelse: 'VITUSAPOTEK     NO',
    Beløp: '-50',
  },
  {
    Dato: '17.09.2024',
    Type: 'Varekjøp',
    Beskrivelse: 'SPAR   NO',
    Beløp: '-349,7',
  },
  {
    Dato: '16.09.2024',
    Type: 'Varekjøp',
    Beskrivelse: 'Disney          NO',
    Beløp: '-291,71',
  },
];

const expectedFormatTwo: EntryFormat['columns'] = [
  {
    'Utført dato': '30.11.2024',
    'Bokført dato': '30.11.2024',
    Rentedato: '29.11.2024',
    Beskrivelse: 'EasyPark AS',
    Type: 'Varekjøp',
    Undertype: 'Varekjøp debetkort',
    'Fra konto': '2801 38 42800',
    Avsender: 'Ola Nordmann',
    'Til konto': '',
    Mottakernavn: '',
    'Beløp inn': '',
    'Beløp ut': '-500',
    Valuta: 'NOK',
    Status: 'Bokført',
    'Melding/KID/Fakt.nr': '*7508 30.11 NOK 10000 Norge AS AS Kurs: 1.0000',
  },
  {
    'Utført dato': '30.11.2024',
    'Bokført dato': '30.11.2024',
    Rentedato: '29.11.2024',
    Beskrivelse: 'Lønn fra Norge AS',
    Type: 'Lønn',
    Undertype: 'Lønn',
    'Fra konto': '2801 38 42800',
    Avsender: '',
    'Til konto': '',
    Mottakernavn: '',
    'Beløp inn': '10000',
    'Beløp ut': '',
    Valuta: 'NOK',
    Status: 'Bokført',
    'Melding/KID/Fakt.nr': 'Fra Norge AS',
  },
];

describe('mapFileToStatementFormat', () => {
  test('CSV upload result is mapped to entryFormatOne', () => {
    const data = mapFromStatementFormat(expectedFormatOne);

    expect(data[0]['isIncomming']).toBe(true);

    expect(data[1]['isIncomming']).toBe(false);

    data.forEach(element => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('date');
      expect(element).toHaveProperty('description');
      expect(element).toHaveProperty('amount');
      expect(element).toHaveProperty('type');
      expect(element).toHaveProperty('isIncomming');
    });
  });
  test('CSV upload result is mapped to entryFormatTwo', () => {
    const data = mapFromStatementFormat(expectedFormatTwo);

    expect(data[0]['isIncomming']).toBe(false);

    expect(data[1]['isIncomming']).toBe(true);

    data.forEach(element => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('date');
      expect(element).toHaveProperty('description');
      expect(element).toHaveProperty('amount');
      expect(element).toHaveProperty('type');
      expect(element).toHaveProperty('isIncomming');
    });
  });
});
