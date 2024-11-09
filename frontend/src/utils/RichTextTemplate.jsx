const introduce = `
  <p><strong>Giới thiệu bản thân:</strong></p>
  <p>Tôi là [Tên của bạn], một [Chuyên ngành/Ngành nghề] với [Số năm kinh nghiệm] năm kinh nghiệm trong lĩnh vực [Lĩnh vực chuyên môn]. Tôi có đam mê với [Điều gì đó liên quan đến nghề nghiệp hoặc sở thích] và mong muốn phát triển kỹ năng của mình trong [Lĩnh vực cụ thể].</p>
  <p>Với khả năng [Kỹ năng nổi bật hoặc điểm mạnh của bạn], tôi đã từng làm việc tại [Tên công ty] và tham gia vào các dự án [Loại dự án hoặc công việc] giúp tôi có cái nhìn sâu sắc hơn về [Lĩnh vực]. Tôi luôn tìm kiếm cơ hội để học hỏi và đóng góp cho [Mục tiêu hoặc sứ mệnh mà bạn muốn đạt được].</p>
`

const project = `
      <p><strong>Tên dự án</strong> | 01/2025 - 05/2025</p>
      <ul>
        <li><strong>Mô tả:</strong> Viết mô tả ngắn gọn dự án</li>
        <li><strong>Vai trò:</strong> chức danh của bạn trong dự án</li>
        <li><strong>Trách nhiệm:</strong>
          <ul>
            <li>Trách nhiệm đầu tiên</li>
            <li>Trách nhiệm thứ hai</li>
          </ul>
        </li>
        <li><strong>Công nghệ:</strong> Liệt kê các công nghệ đã sử dụng</li>
        <li><strong>Nhóm:</strong> x thành viên</li>
      </ul>
    `
const education = `
    <p><strong>Trình độ</strong> : Đại học</p>
    <p><strong>Tên trường</strong> : Đại học Lạc Hồng</p>
    <p><strong>Chuyên ngành:</strong> chuyên ngành của bạn theo học</p>
  `

const certificatesAchievements = `
  <ul>
    <li><strong>Chứng chỉ:</strong> 
      <ul>
        <li>Tên chứng chỉ: <em>(ví dụ: IELTS, TOEIC, v.v.)</em></li>
        <li>Minh chứng: <a href="#">Link chứng chỉ</a></li>
      </ul>
    </li>
    <li><strong>Thành tựu:</strong>
      <ul>
        <li>Thành tựu đầu tiên (ví dụ: Học bổng, giải thưởng)</li>
        <li>Thành tựu thứ hai</li>
      </ul>
    </li>
  </ul>
`

const experience = `
  <p><strong>Tên công ty</strong> | Chức vụ | 01/2023 - 12/2023</p>
  <ul>
    <li><strong>Mô tả công việc:</strong> Tóm tắt công việc và trách nhiệm của bạn tại công ty</li>
    <li><strong>Trách nhiệm chính:</strong>
      <ul>
        <li>Trách nhiệm đầu tiên</li>
        <li>Trách nhiệm thứ hai</li>
      </ul>
    </li>
    <li><strong>Kỹ năng sử dụng:</strong> Liệt kê các kỹ năng và công nghệ đã sử dụng</li>
  </ul>
`

const jobDescription = `
  <p><strong>Mô tả công việc:</strong></p>
  <p>Chúng tôi đang tìm kiếm một ứng viên xuất sắc cho vị trí [Tên vị trí công việc] tại [Tên công ty]. Ứng viên sẽ chịu trách nhiệm về:</p>
  <ul>
    <li><strong>Nhiệm vụ chính 1:</strong> Mô tả chi tiết về nhiệm vụ này và ảnh hưởng của nó đến đội ngũ và công ty.</li>
    <li><strong>Nhiệm vụ chính 2:</strong> Mô tả công việc này cùng với các kỹ năng cần thiết để thực hiện nó hiệu quả.</li>
    <li><strong>Nhiệm vụ chính 3:</strong> Liệt kê bất kỳ nhiệm vụ bổ sung nào có thể phát sinh trong quá trình làm việc.</li>
  </ul>
  <p>Chúng tôi hy vọng ứng viên sẽ thể hiện sự sáng tạo và khả năng giải quyết vấn đề trong các nhiệm vụ được giao.</p>
`

const jobRequirements = `
  <p><strong>Yêu cầu công việc:</strong></p>
  <p>Để đảm bảo thành công trong vị trí này, ứng viên cần đáp ứng các yêu cầu sau:</p>
  <ul>
    <li><strong>Yêu cầu thứ nhất:</strong> Kinh nghiệm làm việc tối thiểu [Số năm] trong lĩnh vực liên quan.</li>
    <li><strong>Yêu cầu thứ hai:</strong> Kiến thức vững về [Các kỹ năng hoặc công nghệ cụ thể].</li>
    <li><strong>Yêu cầu thứ ba:</strong> Kỹ năng giao tiếp tốt và khả năng làm việc nhóm.</li>
  </ul>
  <p>Chúng tôi ưu tiên những ứng viên có tư duy sáng tạo và khả năng làm việc độc lập, đồng thời có thể thích nghi nhanh chóng với môi trường làm việc năng động.</p>
`

const introduceCompany = `
<p><strong>Giới thiệu công ty:</strong></p>
<p>[Tên công ty] là một đơn vị hàng đầu trong lĩnh vực [Lĩnh vực hoạt động của công ty] với sứ mệnh mang đến [Sứ mệnh của công ty: ví dụ "giải pháp sáng tạo", "dịch vụ chất lượng cao"] cho khách hàng. Thành lập vào [Năm thành lập], chúng tôi đã xây dựng và phát triển bền vững nhờ vào đội ngũ chuyên gia có kinh nghiệm và tâm huyết.</p>
<p>Chúng tôi chuyên cung cấp [Các sản phẩm hoặc dịch vụ chính của công ty] cho các đối tác và khách hàng trong các ngành [Danh sách các ngành hoặc lĩnh vực phục vụ]. Với cam kết [Cam kết của công ty: ví dụ "luôn đổi mới", "hướng tới sự hài lòng của khách hàng"], [Tên công ty] tự hào là một trong những lựa chọn hàng đầu trong ngành.</p>
<p>Với môi trường làm việc [Mô tả môi trường làm việc, ví dụ "chuyên nghiệp, năng động"], chúng tôi luôn chào đón những nhân tài có cùng chung đam mê và sẵn sàng cùng công ty đạt được [Mục tiêu hoặc giá trị công ty hướng tới: ví dụ "sự phát triển bền vững"].</p>

`

export {
  introduce,
  project,
  education,
  certificatesAchievements,
  experience,
  jobDescription,
  jobRequirements,
  introduceCompany
}
