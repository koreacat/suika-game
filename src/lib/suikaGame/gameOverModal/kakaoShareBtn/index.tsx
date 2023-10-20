import { useEffect } from "react";

// @ts-ignore
const { Kakao } = window;

const KakaoShareBtn = () => {
  const realUrl = "https://koreacat.github.io/"
  const resultUrl = window.location.href;
  
  useEffect(()=>{
      Kakao.cleanup();
      Kakao.init('f4b26d8412ed1dfc7b776ae50e235fc7');
      console.log(Kakao.isInitialized());
  },[]);

  const shareKakao = () =>{
      Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
              title: '수박 만들기 게임',
              description: '수박 만들기 게임 | 과일들을 모아 수박을 만들어보세요.',
              imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                  mobileWebUrl: realUrl,
              },
          },
          buttons: [
              {
                  title: '게임시작',
                  link: {
                  mobileWebUrl: realUrl,
                  },
              },
              ],
          });
  }

    return (
        <button onClick={shareKakao}>
          카카오톡 공유하기
        </button>
    )
}

export default KakaoShareBtn;