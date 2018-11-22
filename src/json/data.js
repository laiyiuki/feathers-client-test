const categories = [
  {
    id: '幼稚園',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_kindergarden%403x.png?alt=media&token=2e68f10f-704a-445e-bd7d-f50202651697',
    name: '幼稚園',
    type: 'tutor',
  },
  {
    id: '小學',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_primary%403x.png?alt=media&token=f2c45b51-b93b-4c17-81ac-b377038257a5',
    name: '小學',
    type: 'tutor',
  },
  {
    id: '中學',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_secondary%403x.png?alt=media&token=91fc633c-bf58-4348-95a9-2b5fe0899749',
    name: '中學',
    type: 'tutor',
  },
  {
    id: '考試',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_kindergarden%403x.png?alt=media&token=2e68f10f-704a-445e-bd7d-f50202651697',
    name: '考試',
    type: 'tutor',
  },
  {
    id: '其他補習',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_others%403x.png?alt=media&token=c6796190-46af-4e79-b053-1ae5090f91e6',
    name: '其他補習',
    type: 'tutor',
  },
  {
    id: '興趣',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_hobby%403x.png?alt=media&token=1cbfbac0-6e96-4dc9-8b4b-0eee867f2fe7',
    name: '興趣',
    type: 'hobby',
  },
  {
    id: '美術',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_art%403x.png?alt=media&token=a1f9ec16-4612-449d-a17f-61e35914193c',
    name: '美術',
    type: 'hobby',
  },
  {
    id: '運動健身',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_exercise%403x.png?alt=media&token=fbdccd37-0546-4d4e-9b23-a06a380968f7',
    name: '運動健身',
    type: 'hobby',
  },
  {
    id: '音樂',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_music%403x.png?alt=media&token=81f05c6f-7994-4e23-abd9-8fb0d65651b9',
    name: '音樂',
    type: 'hobby',
  },
  {
    id: '語文',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_language%403x.png?alt=media&token=1b44902f-58f6-4863-91c5-63dba2d4e4f6',
    name: '語文',
    type: 'hobby',
  },
  {
    id: '游泳',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_swim%403x.png?alt=media&token=b526cf15-64f6-44b5-8847-bbc3b3a732a9',
    name: '游泳',
    type: 'hobby',
  },
  {
    id: '電腦',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_computer%403x.png?alt=media&token=e90ad91f-3210-48dd-8620-4a0f818063d9',
    name: '電腦',
    type: 'hobby',
  },
  {
    id: '飲食',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_cook%403x.png?alt=media&token=442f3579-2dde-4169-882a-1d9292683c0d',
    name: '飲食',
    type: 'hobby',
  },
  {
    id: '舞蹈',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_dance%403x.png?alt=media&token=98031f07-4a96-49a6-8f8c-24adb4a0ad1c',
    name: '舞蹈',
    type: 'hobby',
  },
  {
    id: '船牌證書',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_certificate%403x.png?alt=media&token=b7f2c98d-3401-4e15-8aa7-f48138563a31',
    name: '船牌證書',
    type: 'hobby',
  },
  {
    id: '槍械牌照',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_machine%403x.png?alt=media&token=714289f9-8c7e-4049-9fba-b77b7cced301',
    name: '槍械牌照',
    type: 'hobby',
  },
  {
    id: '極限運動',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_xgame%403x.png?alt=media&token=1039379d-f395-4818-bbc4-b8ce25b416c3',
    name: '極限運動',
    type: 'hobby',
  },
  {
    id: '其他興趣',
    image:
      'https://firebasestorage.googleapis.com/v0/b/student-24d3c.appspot.com/o/categories%2Fic_others%403x.png?alt=media&token=c6796190-46af-4e79-b053-1ae5090f91e6',
    name: '其他興趣',
    type: 'hobby',
  },
];
