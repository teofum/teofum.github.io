import cn from 'classnames';

import styles from '../styles/module/HoverNote.module.scss';

interface HoverNoteProps {
  children: React.ReactNode;
  text: string;
}

const HoverNote = ({ text, children }: HoverNoteProps) => {
  let note: HTMLElement | null = null;

  const setLeft = (el: HTMLElement) => {
    if (note) {
      const box = el.getBoundingClientRect();
      const parentBox = el.parentElement?.getBoundingClientRect();
      const noteBox = note.getBoundingClientRect();
      const left = box.left - (parentBox?.left || 0);

      note.style.setProperty('left', `-${left}px`);
      note.style.setProperty('max-width', `${parentBox?.width}px`);

      if (noteBox.height > box.top) {
        note.style.setProperty('top', '100%');
        note.style.removeProperty('bottom');
      } else {
        note.style.setProperty('bottom', '100%');
        note.style.removeProperty('top');
      }
    }
  };

  return (
    <span className={styles.text}
      onMouseEnter={e => setLeft(e.target as HTMLElement)}>
      {text}
      <div className={cn('note', styles.note)}
        ref={el => note = el}>
        {children}
      </div>
    </span>
  );
};

export default HoverNote;