import { getRepository } from 'typeorm';
import { Initializer } from './initializer';
import { Route } from '../entities/route';

export default class RouteInitializer extends Initializer {
    repository = getRepository(Route);

    async initialize() {

        this.entities.push(new Route('FI_Acél', [
            [['STAR_SV32J_2', 20], ['STAR_SR38', 20], ['STAR_SV32J_3', 20], ['STAR_SV32J_4', 20]],
            [['EEN320_2', 8]],
            [['TBT', 8], ['AUERBACH', 8], ['IXION-1', 8]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 15], ['NXV560A2', 15], ['MV66A_10', 15]],
            [['MV66A_5', 10], ['MV66A4T2', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('FI_Titán', [
            [['STAR_SV32J_2', 20], ['STAR_SR38', 20], ['STAR_SV32J_3', 20], ['STAR_SV32J_4', 20]],
            [['EEN320_2', 8]],
            [['TBT', 8], ['AUERBACH', 8], ['IXION-1', 8]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 15], ['NXV560A2', 15], ['MV66A_10', 15]],
            [['MV66A_5', 10], ['MV66A4T2', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));


        this.entities.push(new Route('HUMERUS_HWDA', [
            [['STAR_SV32J_2', 7], ['STAR_SV32J_3', 7], ['STAR_SV32J_4', 7]],
            [['EEN320_2', 2]],
            [['AUERBACH', 14], ['IXION-1', 14]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 16]],
            [['MV66A_5', 1], ['MV66A4T1', 20]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('HUMERUS_HWX Flex', [
            [['STAR_SV32J_2', 7], ['STAR_SV32J_3', 7], ['STAR_SV32J_4', 7]],
            [['EEN320_2', 2]],
            [['AUERBACH', 14], ['IXION-1', 14]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 16]],
            [['MV66A_5', 1], ['MV66A4T1', 14]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('HUMERUS_HWX Magic', [
            [['STAR_SV32J_2', 7], ['STAR_SV32J_3', 7], ['STAR_SV32J_4', 7]],
            [['EEN320_2', 2]],
            [['AUERBACH', 14], ['IXION-1', 14]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 16]],
            [['MV66A_5', 1], ['MV66A4T1', 14]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('HUMERUS_HWX Rigid', [
            [['STAR_SV32J_2', 7], ['STAR_SV32J_3', 7], ['STAR_SV32J_4', 7]],
            [['EEN320_2', 2]],
            [['AUERBACH', 14], ['IXION-1', 14]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 16]],
            [['MV66A_5', 1], ['MV66A4T1', 14]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('RETROGRÁD_Retrográd Femur', [
            [['STAR_SV32J_2', 12], ['STAR_SV32J_3', 12], ['STAR_SV32J_4', 12]],
            [['GT 200', 2], ['EEN320_2', 6]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 23], ['NXV560A2', 23]],
            [['MV66A_10', 5], ['MV66A_5', 5], ['MV66A4T1', 5], ['MV66A4T1', 5]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('RETROGRÁD_Spectrum Retrograd', [
            [['STAR_SV32J_2', 12], ['STAR_SV32J_3', 12], ['STAR_SV32J_4', 12]],
            [['GT 200', 2], ['EEN320_2', 6]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 23], ['NXV560A2', 23]],
            [['MV66A_10', 5], ['MV66A_5', 5], ['MV66A4T1', 5], ['MV66A4T1', 5]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('SPF 2_Spectrum Femur 2 - Ac', [
            [['STAR_SV32J_2', 24]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A2', 15]],
            [['MV66A4T1', 5], ['MV66A4T1', 20]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('SPF 2_Spectrum Femur 2 - Ti', [
            [['STAR_SV32J_2', 24]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A2', 15]],
            [['MV66A4T1', 5], ['MV66A4T1', 20]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('STRONG_Acél', [
            [['STAR_SV32J_3', 20], ['STAR_SR38', 20], ['STAR_SV32J_4', 20]],
            [['GT 200', 4], ['EEN320_2', 2]],
            [['TBT', 8], ['AUERBACH', 8], ['IXION-1', 8]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 15], ['NXV560A2', 15], ['MV66A_10', 15]],
            [['MV66A_5', 10], ['MV66A4T1', 10], ['MV66A4T2', 1]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('STRONG_Titán', [
            [['STAR_SV32J_3', 20], ['STAR_SR38', 20], ['STAR_SV32J_4', 20]],
            [['GT 200', 4], ['EEN320_2', 2]],
            [['TBT', 8], ['AUERBACH', 8], ['IXION-1', 8]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['NXV560A1', 15], ['NXV560A2', 15], ['MV66A_10', 15]],
            [['MV66A_5', 10], ['MV66A4T1', 10], ['MV66A4T2', 1]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_FWDA acél', [
            [['STAR_SV32J_4', 20], ['STAR_SV32J_2', 20]],
            [['EEN320_2', 3]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_FWDA titán', [
            [['STAR_SV32J_4', 20], ['STAR_SV32J_2', 20]],
            [['EEN320_2', 3]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_TWXE acél', [
            [['STAR_SV32J_4', 18], ['STAR_SV32J_2', 18]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_TWXE acél Ø8', [
            [['STAR_SV32J_4', 2], ['STAR_SV32J_2', 20]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_TWXE titán', [
            [['STAR_SV32J_4', 18], ['STAR_SV32J_2', 18]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('TWXE/FWDA_TWXE titán Ø8', [
            [['STAR_SV32J_4', 20], ['STAR_SV32J_2', 20]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 10]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));

        this.entities.push(new Route('ZIMMER_Sirus', [
            [['STAR_SV32J_3', 20], ['STAR_SV32J_2', 20]],
            [['GT 200', 1]],
            [['TBT', 10], ['AUERBACH', 10], ['IXION-1', 2]],
            [['Hajlítás 1', 2], ['Hajlítás 2', 2]],
            [['MV66A_10', 10]],
            [['MV66A_5', 2]],
            [['MV66A4T2', 12]],
            [['Sorjázás', 2]],
            [['Csiszolás 1', 2], ['Csiszolás 2', 2]]
        ]));
        await super.initialize();
    }
}
