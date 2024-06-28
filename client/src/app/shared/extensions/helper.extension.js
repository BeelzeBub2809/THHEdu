// Hàm để thêm số 0 đứng đầu nếu số nhỏ hơn 10
export const AddLeadingZero = (number) => {
    return number > 9 || number == 0 ? number : '0' + number;
}
  
  // Hàm tiện ích để định dạng thời gian còn lại dưới dạng phút:giây
export function FormatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
  
  // Hàm chuyển đổi giây thành chuỗi thời gian định dạng giờ:phút:giây
export const ConvertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const hourString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minuteString = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
    const secondString = remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : '';
  
    if (hours > 0) {
      return `${hourString} : ${minuteString || '0 minute'} ${secondString && `: ${secondString}`}`;
    } else if (!hours && minutes > 0) {
      return `${minuteString} ${secondString && `: ${secondString}`}`;
    }
  
    return secondString;
}
  
  // Hàm để làm mới trang
export const RefreshPage = () => {
    window.location.reload();
}
  
  // Hàm để trộn ngẫu nhiên các phần tử trong mảng
export const ShuffleArray = (array) => {
    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
  
      // Đổi chỗ các phần tử bằng destructuring
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
}
  