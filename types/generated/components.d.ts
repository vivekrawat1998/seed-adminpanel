import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAccelaratorVariety extends Struct.ComponentSchema {
  collectionName: 'components_shared_accelarator_varieties';
  info: {
    displayName: 'AccelaratorVariety';
  };
  attributes: {
    PurposeMode: Schema.Attribute.String;
    quantityinkg: Schema.Attribute.BigInteger;
    Typeofseedrequired: Schema.Attribute.Enumeration<
      ['Breederseed', 'Foundationseed', 'CertifiedSeed', 'others']
    >;
    VarietyName: Schema.Attribute.String;
  };
}

export interface SharedNominated extends Struct.ComponentSchema {
  collectionName: 'components_shared_nominateds';
  info: {
    displayName: 'nominated';
  };
  attributes: {};
}

export interface SharedNominatedVariety extends Struct.ComponentSchema {
  collectionName: 'components_shared_nominated_varieties';
  info: {
    displayName: 'nominated variety';
  };
  attributes: {
    variety: Schema.Attribute.Component<'shared.variety', true>;
  };
}

export interface SharedNominatedvariety extends Struct.ComponentSchema {
  collectionName: 'components_shared_nominatedvarieties';
  info: {
    displayName: 'nominatedvariety';
  };
  attributes: {
    accelaratorvariety: Schema.Attribute.Component<
      'shared.accelarator-variety',
      true
    >;
  };
}

export interface SharedVariety extends Struct.ComponentSchema {
  collectionName: 'components_shared_varieties';
  info: {
    displayName: 'variety';
  };
  attributes: {
    Bsavailability: Schema.Attribute.BigInteger;
    Duration: Schema.Attribute.BigInteger;
    Ecosystem: Schema.Attribute.String;
    GrainShape: Schema.Attribute.BigInteger;
    MarketSegment: Schema.Attribute.String;
    PotentialYields: Schema.Attribute.BigInteger;
    Seedavailability: Schema.Attribute.BigInteger;
    SpecialTrait: Schema.Attribute.String;
    StatetRecommended: Schema.Attribute.String;
    variety: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.accelarator-variety': SharedAccelaratorVariety;
      'shared.nominated': SharedNominated;
      'shared.nominated-variety': SharedNominatedVariety;
      'shared.nominatedvariety': SharedNominatedvariety;
      'shared.variety': SharedVariety;
    }
  }
}
