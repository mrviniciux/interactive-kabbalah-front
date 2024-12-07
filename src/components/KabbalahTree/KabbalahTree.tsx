import Sephirot, { BiggerSephirot } from '@/components/Sephirot';
import {
  binah,
  chesed,
  chokma,
  daath,
  gevurah,
  hod,
  kether,
  malkuth,
  netzach,
  tiferet,
  yesod,
} from '@/components/Sephirot/__mock__/sephirots.mock';
import useSephirot, { useBiggerSephirot } from '@/hooks/useSephirot';
import Path from '../Paths';
import { KabbalahTreeContainerStyled } from './KabbalahTree.styled';

function KabbalahTree() {
  return (
    <KabbalahTreeContainerStyled>
      <div className="sephirot-container kether">
        <Path
          number={12}
          letter="ב"
          sign="☿︎"
          arcane="I"
          className="path beth ב"
          type="diagonal"
          diagonalTo="left"
          degree={140}
          position={{ $left: '25%', $top: '1%' }}
        />

        <BiggerSephirot {...useBiggerSephirot(kether)} />

        <Path
          number={11}
          letter="א"
          sign="🜁"
          arcane="0"
          className="path aleph א"
          type="diagonal"
          diagonalTo="right"
          degree={35}
          position={{ $right: '56%', $top: '1%' }}
        />
      </div>
      <div className="sephirot-container binah-chokma">
        <div>
          <BiggerSephirot {...useBiggerSephirot(binah)} />
          <Path
            number={18}
            letter="ח"
            sign="♋"
            arcane="VII"
            className="path chet ח"
            type="vertical"
            position={{ $top: '14%' }}
          />
        </div>

        <Path
          number={4}
          letter="ד"
          sign="♀"
          arcane="III"
          className="path daleth ד"
          type="horizontal"
          position={{ $top: '15.555%' }}
          $width="200vw" //centralized trough width
        />

        <div>
          <BiggerSephirot {...useBiggerSephirot(chokma)} />
          <Path
            number={16}
            letter=" ו"
            sign="♉"
            arcane=" VI"
            className="path vav ו"
            type="vertical"
            position={{ $top: '14%' }}
          />
        </div>
      </div>

      <div className="sephirot-container daath">
        <Sephirot {...daath} />
      </div>

      <div className="sephirot-container gevura-chesed">
        <Sephirot {...useSephirot(gevurah)} />
        <Sephirot {...useSephirot(chesed)} />
      </div>

      <div className="sephirot-container tiferet">
        <Sephirot {...useSephirot(tiferet)} />
      </div>

      <div className="sephirot-container hod-netzach">
        <Sephirot {...useSephirot(hod)} />
        <Sephirot {...useSephirot(netzach)} />
      </div>

      <div className="sephirot-container yesod">
        <Sephirot {...useSephirot(yesod)} />
      </div>

      <div className="sephirot-container malkuth">
        <BiggerSephirot {...useBiggerSephirot(malkuth)} />
      </div>
    </KabbalahTreeContainerStyled>
  );
}

export default KabbalahTree;
