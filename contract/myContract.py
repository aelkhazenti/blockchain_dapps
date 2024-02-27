import smartpy as sp


@sp.module

def main():
    class Voting(sp.Contract):
        def __init__(self):
                self.data.voters = sp.big_map({})
                self.data.candidateA_votes = sp.nat(0)
                self.data.candidateB_votes = sp.nat(0)
                self.data.total_votes = sp.nat(0)
    
    
        @sp.entry_point
        def vote_for_candidate_A(self):  
            self.data.voters[sp.sender] = True
            self.data.candidateA_votes = self.data.candidateA_votes + 1
            self.data.total_votes = self.data.total_votes + 1
    
        @sp.entry_point
        def vote_for_candidate_B(self):  

            self.data.voters[sp.sender] = True
            self.data.candidateB_votes = self.data.candidateB_votes + 1
            self.data.total_votes = self.data.total_votes + 1
        
        
        @sp.entry_point
        def reset_voting(self):  
            self.data.voters = sp.big_map({})
            self.data.candidateA_votes = sp.nat(0)
            self.data.candidateB_votes = sp.nat(0)
            self.data.total_votes = sp.nat(0)
            
@sp.add_test()
def test():
    scenario = sp.test_scenario("Voting Test", main)
    scenario.h1("Voting Test")
    
    admin  = sp.test_account("admin")
    sahil  = sp.test_account("sahil")
    archit = sp.test_account("archit")
    yash   = sp.test_account("yash")
    samridhi  = sp.test_account("samridhi")
    rohit  = sp.test_account("rohit")
    
    voting = main.Voting()
    scenario += voting
    
    #vote_for_candidate_A
    voting.vote_for_candidate_A(_sender = sahil)
    voting.vote_for_candidate_A(_sender = samridhi)
    voting.vote_for_candidate_A(_sender = rohit) 
    
    #vote_for_candidate_B
    voting.vote_for_candidate_B(_sender = archit)
    voting.vote_for_candidate_B(_sender = yash)

    voting.reset_voting()
    voting.vote_for_candidate_B(_sender = archit)
