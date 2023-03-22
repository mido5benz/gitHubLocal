import {DispoStopp} from '@shared/models';

export const isUnassignedStopp = (stopp: DispoStopp): boolean => stopp.tournr === '9999' || !stopp.tournr;
