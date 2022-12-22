// Client facing scripts here
$(() => {
  // $('#generatedPage').empty();
  // $('#generatedPage').append(
  //   `
  //   <form action="/polls" method="POST" id="create-poll">
  //     <div class="row mb-3">
  //       <div class="row mb-3">
  //         <label for="inputEmail" class="col-sm-2 col-form-label">Your email:</label>
  //         <div class="col-sm-10">
  //           <input type="email" class="form-control" id="inputEmail" name="email" required>
  //         </div>
  //       </div>
  //     </div>
  
  //     <div class="row mb-3"><h3>What do you want to ask?</h3>
  //       <div class="row mb-3">
  //         <label for="inputQuestion" class="col-sm-2 col-form-label">Question:</label>
  //         <div class="col-sm-10">
  //           <input type="text" class="form-control" id="inputQuestion" name="question" minlength="5" required>
  //         </div>

  //       </div>
  
  //       <div class="row mb-3">
  //         <label for="inputTitle" class="col-sm-2 col-form-label">Description:</label>
  //         <div class="col-sm-10">
  //           <textarea class="form-control" id="inputTitle" name="description" placeholder="optional"></textarea>
  //         </div>
  //       </div>
  //     </div>
  //     <div id="Answer1">
  //       <div class="row mb-3 answerOne"><h3>Answer #1:</h3>
  //         <div class="row mb-3">
  //           <label for="answer1" class="col-sm-2 col-form-label">Answer:</label>
  //           <div class="col-sm-10">
  //             <input type="text" class="form-control" id="answer1" name="answer1_title" required>
  //           </div>
  //         </div>
  //         <div class="row mb-3">
  //           <label for="answer1_description" class="col-sm-2 col-form-label">Description:</label>
  //           <div class="col-sm-10">
  //             <textarea rows="3" class="form-control" id="answer1_description" name="answer1_description" placeholder="optional"></textarea>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
      
  //     <div id="Answer2">
  //       <div class="row mb-3"><h3>Answer #2:</h3>
  //         <div class="row mb-3">
  //           <label for="answer2" class="col-sm-2 col-form-label">Answer:</label>
  //           <div class="col-sm-10">
  //             <input type="text" class="form-control" id="answer2" aria-describedby="answer2Feedback" name="answer2_title" required>
  //           </div>
  //         </div>
  //         <div class="row mb-3">
  //           <label for="answer2_description" class="col-sm-2 col-form-label">Description:</label>
  //           <div class="col-sm-10">
  //             <textarea rows="3" class="form-control" id="answer2_description" name="answer2_description" placeholder="optional"></textarea>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  
  //     <div id="moreAnswers">
  
  //     </div>
  
  //     <div class="row mb-3">
  //       <div class="col-sm-2"></div>
  //       <div class="col-sm-7">
  //         <button type="button" class="btn btn-primary" id="addMoreAnswers"  onclick="addOption();">add options</button>
  //       </div>
  //       <div class="col-sm-3">
  //         <button type="button" class="btn btn-primary" id="removeAnswers"  disabled onclick="removeOption();">remove options</button>
  //       </div>
  
  //     </div>
  //     <hr class="border border-primary border-1">
  //     <button type="submit" class="btn btn-primary btn-lg col-12 text-nowrap">Create Poll</button>      
  //   </form>
  //   `
  // );

  // const redirectButton = () => {
  //   if ($('#inputEmail').val() || $('#inputQuestion').val() || $('#inputQuestion').val() || $('#answer1').val() || $('#answer2').val()) {
  //     if (confirm('This will start a new poll and remove the current form\'s data.\nAre you sure?')) {
  //       console.log('Ok is clicked.');
  //       $(location).attr('href', '/');
  //     } else {
  //       console.log('Cancel is clicked.');
  //     }
  //   } else {
  //     $(location).attr('href', '/');
  //   }
  // };

  // document.getElementById("newPoll").addEventListener("click", redirectButton);

});


