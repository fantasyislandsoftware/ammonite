import React from 'react';

declare global {
  interface Document {
    [key: string]: () => void;
  }
}

interface DocumentBody {
  [key: string]: () => void;
}

class FullScreenButton extends React.Component {
  body: DocumentBody;
  enterFullScreen: (() => void) | undefined;
  exitFullScreen: (() => void) | undefined;
  constructor(props: any) {
    super(props);
    this.body = document.body as HTMLElement & DocumentBody;
    this.enterFullScreen =
      /* Firefox */
      this.body.requestFullScreen ||
      /* Firefox */
      this.body.mozRequestFullScreen ||
      /* Chrome, Safari & Edge */
      this.body.webkitRequestFullScreen ||
      /* IE11 */
      this.body.msRequestFullscreen;
    this.exitFullScreen =
      /* Firefox */
      document.exitFullscreen ||
      /* Firefox */
      document.mozCancelFullScreen ||
      /* Chrome, Safari & Edge */
      document.webkitExitFullscreen ||
      /* IE11 */
      document.msExitFullscreen;
  }

  isFullScreen() {
    if (window.document.fullscreen === true) {
      return true;
    } else if (window.document.fullscreenElement) {
      return true;
    } else if (window.screenTop && window.screenY) {
      return true;
    } else {
      return false;
    }
  }

  toggleFullScreen() {
    this.isFullScreen()
      ? this.exitFullScreen?.call(document)
      : this.enterFullScreen?.call(this.body);
  }

  render() {
    if (!this.enterFullScreen) {
      return <>nope</>;
    }
    return <button onClick={() => this.toggleFullScreen()}>FullScreen</button>;
  }
}

export default FullScreenButton;
